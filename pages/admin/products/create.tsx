import { ReactElement } from 'react'
import { Box } from '@mui/material'
import * as yup from 'yup'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { NextPageAuth } from 'next'
import { useMutation } from 'react-query'
import { ProductServices } from 'api/product.service'
import { useRouter } from 'next/router'
import { ThumbnailServices } from 'api/thumbnail.service'
import { objToFormData } from 'utils/formData'

const CreateProduct: NextPageAuth = () => {
  const router = useRouter()
  const INITIAL_VALUES = {
    name: '',
    full_description: '',
    short_description: '',
    gallery: {
      thumbnails: [],
    },
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('required'),
    price: yup.number().required('required'),
    sale_price: yup.number().required('required'),
    full_description: yup.string().required('required'),
    short_description: yup.string().required('required'),
    category: yup.string().required('required'),
  })

  const { mutate: CreateProduct, isLoading } = useMutation(
    'product create',
    (values: IProduct) => ProductServices.create(values),
    {
      onSuccess: (data: IProduct) => {
        router.push(`/admin/products/`)
      },
    },
  )

  const { mutate: CreateImage, isLoading: CreateImageLoading } = useMutation(
    'product image add',
    (values: IThumbnail) => ThumbnailServices.create(values),
    {
      onSuccess: () => {},
    },
  )

  const handleFormSubmit = ({ category, gallery, ...values }: IProduct) => {
    CreateProduct(
      {
        ...values,
        category: {
          id: category as number,
        },
      },
      {
        onSuccess: async (data: IProduct) => {
          if (!!gallery?.thumbnails?.length) {
            const thumbnailsPromises = gallery?.thumbnails?.map((thumbnail: any, index) => {
              CreateImage(
                {
                  imageFile: thumbnail.file,
                  position: data?.gallery?.thumbnails
                    ? data?.gallery?.thumbnails?.length + index + 1
                    : index + 1,
                  galleryId: data?.gallery?.id,
                },
                {
                  onError: (error) => {
                    console.log(error)
                  },
                },
              )
            })

            await Promise.all(thumbnailsPromises)

            console.log('all done')
          }
        },
      },
    )
  }

  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
        submitLoading={isLoading || CreateImageLoading}
        mode="create"
      />
    </Box>
  )
}
CreateProduct.isAdmin = true

export default CreateProduct

// =============================================================================
CreateProduct.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================
