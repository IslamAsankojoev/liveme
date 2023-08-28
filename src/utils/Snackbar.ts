import { useSnackbar, VariantType } from 'notistack'

let useSnackbarRef: any
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export default {
  success(msg: string) {
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant })
  }
}