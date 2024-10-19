import {
  Stack,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs as MUITabs,
} from '@mui/joy'
import { FC } from 'react'

interface TabsProps {
  tabsContent: JSX.Element[]
  tabsName: string[]
}

const Tabs: FC<TabsProps> = ({ tabsContent, tabsName }) => {
  return (
    <MUITabs defaultValue={0} sx={{ backgroundColor: 'transparent' }}>
      <TabList
        size="sm"
        sx={{
          pl: { xs: 0, md: 4 },
          justifyContent: 'left',
          [`&& .${tabClasses.root}`]: {
            fontWeight: '600',
            flex: 'initial',
            color: 'text.tertiary',
            [`&.${tabClasses.selected}`]: {
              bgcolor: 'transparent',
              color: 'text.primary',
              '&::after': {
                height: '2px',
                bgcolor: 'primary.500',
              },
            },
          },
        }}
        tabFlex={1}
      >
        {tabsName.map((name, index) => (
          <Tab key={index} indicatorInset sx={{ borderRadius: '6px 6px 0 0' }}>
            {name}
          </Tab>
        ))}
      </TabList>
      <Stack spacing={4}>
        {tabsContent.map((content, index) => (
          <TabPanel key={index} value={index}>
            {content}
          </TabPanel>
        ))}
      </Stack>
    </MUITabs>
  )
}

export default Tabs
