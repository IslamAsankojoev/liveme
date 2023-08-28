import { FC } from 'react'
import { StyledClear, UploadImageBox } from '../StyledComponents'
import BazaarImage from 'components/BazaarImage'
import { Box } from '@mui/material'

interface ImageItemProps {
  file: any
  handleFileDelete: (file: any) => () => void
}

const ImageItem: FC<ImageItemProps> = ({ file, handleFileDelete }) => {
  return (
    <>
        <Box width="100%" height="100%" position="relative">
          <UploadImageBox>
            <BazaarImage src={file.link} width="100%" />
          </UploadImageBox>
          <Box sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}/>
          <StyledClear sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 2,
          }} onClick={handleFileDelete(file)} />
        </Box>
    </>
  )
}

export default ImageItem
