import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const unauthorizedUrls = ['/login', '/register', '/forgot-password', '/reset-password']
const userUrls = ['/profile', '/orders', '/wish-list', '/address']
const adminUrls = ['/admin']
const vendorUrls = ['/vendor']
const allUrls = [...userUrls, ...adminUrls, ...vendorUrls]
const siteUrl = process.env.SITE_URL

const rewritesUrls = [{
  from: '/shop',
  to: '/sale-page-2',
}]

const redirects = {
  toLogin: () => NextResponse.rewrite(new URL('/login', siteUrl)),
  toProfile: () => NextResponse.redirect(new URL('/profile', siteUrl)),
  toPath: {
    rewrite: (path: string) => NextResponse.rewrite(new URL(path, siteUrl)),
    redirect: (path: string) => NextResponse.redirect(new URL(path, siteUrl))
  },
}

export async function middleware(request: NextRequest) {

  const matchingRewrite = rewritesUrls.find(url => request?.nextUrl?.pathname.startsWith(url.from))

  if (matchingRewrite) return redirects.toPath.rewrite(matchingRewrite.to)

  try {
    // @ts-ignore
    const user:IUser = await getToken({ req: request, secret: process.env.SECRET })

    const isUserLoggedIn = user !== null

    const matchingUrl = allUrls.find(url => request?.nextUrl?.pathname.startsWith(url))

    if (matchingUrl) {
      if (!isUserLoggedIn) return redirects.toLogin()
      if (request?.nextUrl?.pathname.startsWith('/admin') && user?.role?.name !== 'admin') return redirects.toProfile()
      if (request?.nextUrl?.pathname.startsWith('/vendor') && user?.role?.name !== 'manager') return redirects.toProfile()
    }

    const matchingUnauthorizedUrl = unauthorizedUrls.find(url => request?.nextUrl?.pathname?.startsWith(url))

    if (matchingUnauthorizedUrl && isUserLoggedIn) return redirects.toProfile()

    return NextResponse.next()
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.error()
  }
}
