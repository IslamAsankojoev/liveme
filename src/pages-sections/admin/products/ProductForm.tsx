import { FC, useContext, useEffect, useState } from 'react'
import { Box, Card, Grid, MenuItem, TextField, styled } from '@mui/material'
import { Formik } from 'formik'
import DropZone from 'components/DropZone'
import { CategoryService } from 'api/category.service'
import { LoadingButton } from '@mui/lab'
import { productContext } from '../../../../pages/admin/products/[id]'
import ImageItem from './ImageItem'
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move'
import _ from 'lodash'
import Resizer from "react-image-file-resizer";
import { useQuery } from 'react-query'


// ================================================================
type ProductFormProps = {
  initialValues: IProduct
  handleFormSubmit: (values: IProduct) => void
  validationSchema: any
  submitLoading: boolean
  mode: 'create' | 'edit'
}

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "PNG",
      97,
      0,
      (blob) => {
        const fileName = `${new Date().toISOString()}-${file.name}`;
        const newBlob = new Blob([blob as any], { type: 'image/jpeg' });
        const newFile = new File([newBlob], fileName, { type: 'image/jpeg' });
        resolve(newFile);
      },
      "blob",
      600,
      600
    );
  });

const StyledTextField = styled(TextField)(({ theme }) => ({}))
// ================================================================

const ProductForm: FC<ProductFormProps> = (props) => {
  const { initialValues, validationSchema, handleFormSubmit, submitLoading, mode } = props
  const [imageLoading, setImageLoading] = useState(false)

  const isCreateMode = mode === 'create'
  const { setWillRemovedThumbnail } = useContext(productContext)

  const { data: categories } = useQuery('categories list', CategoryService.findAll, {
    select: (data: ICategory[]) => data,
  })

  const [files, setFiles] = useState([])

  const handleChangeDropZone = async (uploadedFiles: File[]) => {
    const uploadedFilesTransformed = await Promise.all(
      uploadedFiles.map(async (file, index) => {
        try {
          const resizedFile = await resizeFile(file);
          if (resizedFile) {
            setFiles((state) => [...state, {
              file: resizedFile,
              link: URL.createObjectURL(resizedFile as any),
              id: file?.name,
              position: (initialValues?.gallery?.thumbnails?.length || 0) + index + 1,
              uploaded: true,
            }])
          }
        } catch (error) {
          console.error("Error resizing file:", error);
        }
      })
    );

    // setFiles((state) => [...state, ...uploadedFilesTransformed.filter(Boolean)]);
    setImageLoading(false)
  };



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
        thumbnails: files,
      },
    })
  }

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setFiles(arrayMoveImmutable(files, oldIndex, newIndex).map((item, index) => {
      return {
        ...item,
        position: index + 1,
      }
    }))
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
                  <DropZone onChange={(files) => {
                    setImageLoading(true)
                    handleChangeDropZone(files)
                  }} loading={imageLoading} />

                  <Box mt={2}>
                    <SortableList
                      onSortEnd={onSortEnd}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                      }}
                    >
                      {files?.map((item) => {
                        return (
                          <SortableItem key={item}>
                            <div>
                              <ImageItem file={item} handleFileDelete={handleFileDelete} />
                            </div>
                          </SortableItem>)
                      })}
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
