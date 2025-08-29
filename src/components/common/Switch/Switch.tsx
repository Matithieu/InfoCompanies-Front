import { Switch as JoySwitch } from '@mui/joy'
import { FC, useState } from 'react'

type SwitchProps = {
  checked: boolean
  style?: React.CSSProperties
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>
}

const Switch: FC<SwitchProps> = ({ checked, style, handleOnChange }) => {
  const [switchState, setSwitchState] = useState(checked)

  return (
    <JoySwitch
      checked={switchState}
      sx={{ ...style, marginLeft: 1 }}
      onChange={(e) => {
        setSwitchState(!switchState)
        handleOnChange(e)
      }}
    />
  )
}

export default Switch
