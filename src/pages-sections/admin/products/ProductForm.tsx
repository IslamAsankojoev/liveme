import { FC, useContext, useEffect, useState } from 'react'
import { Box, Button, Card, Grid, MenuItem, TextField, styled } from '@mui/material'
import { Formik } from 'formik'
import DropZone from 'components/DropZone'
import { FlexBox } from 'components/flex-box'
import BazaarImage from 'components/BazaarImage'
import { UploadImageBox, StyledClear } from '../StyledComponents'
import { useQuery } from 'react-query'
import { CategoryService } from 'api/category.service'
import { LoadingButton } from '@mui/lab'
import { red } from '@mui/material/colors'
import { formDataToObj, objToFormData } from 'utils/formData'
import { productContext } from '../../../../pages/admin/products/[id]'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Reorder, useDragControls } from 'framer-motion'
import ReorderIcon from '@mui/icons-material/Reorder'
import ImageItem from './ImageItem'
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable, arrayMoveMutable } from 'array-move'

// ================================================================
type ProductFormProps = {
  initialValues: IProduct
  handleFormSubmit: (values: IProduct) => void
  validationSchema: any
  submitLoading: boolean
  mode: 'create' | 'edit'
}

const StyledTextField = styled(TextField)(({ theme }) => ({}))
// ================================================================

const ProductForm: FC<ProductFormProps> = (props) => {
  const { initialValues, validationSchema, handleFormSubmit, submitLoading, mode } = props
  const [parent, enable] = useAutoAnimate()
  const controls = useDragControls()

  const isCreateMode = mode === 'create'
  const { setWillRemovedThumbnail } = useContext(productContext)

  const { data: categories } = useQuery('categories list', CategoryService.findAll, {
    select: (data: ICategory[]) => data,
  })

  const [files, setFiles] = useState([])
  const [localeThumbnails, setLocaleThumbnails] = useState([])

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files: File[]) => {
    files.forEach((file, index) =>
      Object.assign(file, {
        link: URL.createObjectURL(file),
        id: file.name,
        position: initialValues?.gallery?.thumbnails?.length + index + 1,
      }),
    )
    setFiles((state) => [...state, ...files])
    setLocaleThumbnails((state) => [...state, ...files])
  }

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: any) => () => {
    setFiles((files) => files.filter((item: any) => item.id !== file.id))
    if (!!initialValues?.gallery?.thumbnails?.find((item) => item.id === file.id)) {
      setWillRemovedThumbnail((state) => [...state, file.id])
    }
  }

  const handleFormSubmitWithFiles = (values: IProduct) => {
    handleFormSubmit({
      ...values,
      gallery: {
        thumbnails: localeThumbnails,
      },
    })
  }

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newFiles = arrayMoveImmutable(files, oldIndex, newIndex)

    setFiles(newFiles)
  }

  useEffect(() => {
    if (!!initialValues?.gallery?.thumbnails?.length) {
      setFiles(initialValues?.gallery?.thumbnails)
    }
  }, [initialValues])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <Card sx={{ p: 3 }}>
      <Formik
        onSubmit={handleFormSubmitWithFiles}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      name="name"
                      label="Name"
                      color="info"
                      size="medium"
                      placeholder="Name"
                      value={values?.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={(touched.name && errors.name) as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      select
                      fullWidth
                      color="info"
                      size="medium"
                      name="category"
                      onBlur={handleBlur}
                      placeholder="Category"
                      onChange={handleChange}
                      value={values?.category}
                      label="Select Category"
                      // SelectProps={{ multiple: true }}
                      error={!!touched.category && !!errors.category}
                      helperText={(touched.category && errors.category) as string}
                    >
                      {categories?.map((category) => (
                        <MenuItem key={category?.id} value={category?.id}>
                          {category?.name}
                        </MenuItem>
                      ))}
                    </StyledTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      rows={3}
                      multiline
                      fullWidth
                      color="info"
                      size="medium"
                      name="short_description"
                      label="Short description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Description"
                      value={values?.short_description}
                      error={!!touched.short_description && !!errors.short_description}
                      helperText={(touched.short_description && errors.short_description) as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      rows={6}
                      multiline
                      fullWidth
                      color="info"
                      size="medium"
                      name="full_description"
                      label="Full description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Description"
                      value={values?.full_description}
                      error={!!touched.full_description && !!errors.full_description}
                      helperText={(touched.full_description && errors.full_description) as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      name="price"
                      color="info"
                      size="medium"
                      type="number"
                      onBlur={handleBlur}
                      value={values?.price}
                      label="Regular Price"
                      onChange={handleChange}
                      placeholder="Regular Price"
                      error={!!touched.price && !!errors.price}
                      helperText={(touched.price && errors.price) as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      color="info"
                      size="medium"
                      type="number"
                      name="sale_price"
                      label="Sale Price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Sale Price"
                      value={values?.sale_price}
                      error={!!touched?.sale_price && !!errors?.sale_price}
                      helperText={(touched?.sale_price && errors?.sale_price) as string}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LoadingButton
                      loading={submitLoading}
                      variant="contained"
                      color="info"
                      type="submit"
                    >
                      Save product
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid item xs={12}>
                  <DropZone onChange={(files) => handleChangeDropZone(files)} />

                  <Box mt={2}>
                    <SortableList
                      onSortEnd={onSortEnd}
                      draggedItemClassName="dragged"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                      }}
                    >
                      {files?.map((item) => (
                        <SortableItem key={item}>
                          <div>
                            <ImageItem file={item} handleFileDelete={handleFileDelete} />
                          </div>
                        </SortableItem>
                      ))}
                      {/* {files?.map((item) => {
                        console.log('item', item)
                        return (<></>)
                      })} */}
                    </SortableList>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  )
}

export default ProductForm
