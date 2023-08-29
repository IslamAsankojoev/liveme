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
            <Box sx={{
              backgroundImage: `url(${file.link})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}/>
          </UploadImageBox>
          <Box sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}/>
          <StyledClear  onClick={handleFileDelete(file)} />
        </Box>
    </>
  )
}

export default ImageItem
