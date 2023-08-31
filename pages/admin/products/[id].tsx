import { Box, Button } from '@mui/material'
import { ProductServices } from 'api/product.service'
import { ThumbnailServices } from 'api/thumbnail.service'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { NextPageAuth } from 'next'
import { useRouter } from 'next/router'
import { ProductForm } from 'pages-sections/admin'
import { ReactElement, createContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import * as yup from 'yup'
// import api from "utils/__api__/products";

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required('required'),
  price: yup.number().required('required'),
  sale_price: yup.number().required('required'),
  full_description: yup.string().required('required'),
  short_description: yup.string().required('required'),
  category: yup.string().required('required'),
})

export const productContext = createContext({
  willRemovedThumbnail: [],
  setWillRemovedThumbnail: (value: any) => { },
})

const EditProduct: NextPageAuth = () => {
  const router = useRouter()

  const [willRemovedThumbnail, setWillRemovedThumbnail] = useState([])

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery('product', () => ProductServices.findOne(Number(router.query.id)), {
    enabled: !!router.query.id,
    select: ({ category, ...rest }: IProduct) => {
      return category ? ({ ...rest, category: category.id } as IProduct) : rest
    },
  })

  const { mutate: UpdateProduct, isLoading: mutateLoading } = useMutation(
    'product update',
    (values: IProduct) => ProductServices.update(Number(router.query.id), values),
    {
      onSuccess: () => { },
    },
  )

  const { mutate: CreateImage, isLoading: CreateImageLoading } = useMutation(
    'product image add',
    (values: IThumbnail) => ThumbnailServices.create(values),
    {
      onSuccess: () => { },
    },
  )

  const { mutate: UpdateImage, isLoading: UpdateImageLoading } = useMutation(
    'product image update',
    (values: IThumbnail) => ThumbnailServices.update(values.id, values),
    {
      onSuccess: () => { },
    },
  )

  const { mutate: DeleteImage, isLoading: DeleteImageLoading } = useMutation(
    'product image delete',
    (id: number) => ThumbnailServices.delete(id),
    {
      onSuccess: () => { },
    },
  )

  const handleFormSubmit = ({ category, gallery, ...values }) => {
    UpdateProduct(
      {
        ...values,
        category: {
          id: category as number,
        },
      },
      {
        onSuccess: async (data: IProduct) => {
          if (!!gallery.thumbnails.length) {
            const thumbnailsPromises = gallery.thumbnails.map((thumbnail: any, index) => {
              if (thumbnail.uploaded) {
                CreateImage(
                  {
                    imageFile: thumbnail.file,
                    position: index + 1,
                    galleryId: data?.gallery?.id,
                  },
                  {
                    onError: (error) => {
                      console.log(error)
                    },
                  },
                )
              } else {
                UpdateImage(
                  {
                    id: thumbnail.id,
                    position: index + 1,
                  },
                  {
                    onError: (error) => {
                      console.log(error)
                    },
                  },
                )
              }
            })
            await Promise.all(thumbnailsPromises)
          }

          if (!!willRemovedThumbnail.length) {
            const thumbnailsPromises = willRemovedThumbnail.map((thumbnail: any) => {
              DeleteImage(thumbnail, {
                onError: (error) => {
                  console.log(error)
                },
              })
            })
            await Promise.all(thumbnailsPromises)
            setWillRemovedThumbnail([])
          }
        },
      },
    )
  }

  return (
    <productContext.Provider
      value={{
        willRemovedThumbnail,
        setWillRemovedThumbnail,
      }}
    >
      <Box py={4}>
        <H3 mb={2}>
          Edit Product -{' '}
          <Button
            onClick={() => {
              refetch()
            }}
          >
            load data
          </Button>
        </H3>

        {isLoading ? (
          'loading'
        ) : (
          <ProductForm
            initialValues={product}
            validationSchema={validationSchema}
            handleFormSubmit={handleFormSubmit}
            submitLoading={mutateLoading || CreateImageLoading || UpdateImageLoading || DeleteImageLoading}
            mode="edit"
          />
        )}
      </Box>
    </productContext.Provider>
  )
}
EditProduct.isAdmin = true

export default EditProduct

// =============================================================================
EditProduct.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================
