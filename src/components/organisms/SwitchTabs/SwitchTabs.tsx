import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React from 'react';

// Define the interface for the component props
interface SwitchTabsProps {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
}

const SwitchTabs: React.FC<SwitchTabsProps> = ({ tabs }) => {
  return (
    <div>
      <Tabs variant="unstyled">
        <TabList className="flex gap-1">
          {tabs.map((tab, index) => (
            <Tab
              role="tab"
              key={index}
              _selected={{ color: 'white', bg: '#2C6E49', padding: '0 20px' }} // Styling for the active tab
              fontSize="xs"
              px={6}
              py={2}
              borderRadius="md"
              className="text-sm rounded-md bg-beige-ds px-4"
            >
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <span className="w-full my-4 h-[2px] rounded-md bg-[#D9D9D9] block" />

        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SwitchTabs;
