import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface SwitchTabsProps {
  tabs: {
    title: string;
    content: React.ReactNode;
    path: string;
    id: string;
  }[];
  activeTab: string;
}

const SwitchTabs: React.FC<SwitchTabsProps> = ({ tabs, activeTab }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.title === activeTab);
    if (index !== -1) {
      setTabIndex(index);
    }
  }, [activeTab, tabs]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    const newTab = tabs[index];

    router.push(`profile/?tab=${newTab.path}`);
  };

  return (
    <div>
      <Tabs variant="unstyled" index={tabIndex} onChange={handleTabChange}>
        <TabList className="flex gap-1">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              _selected={{ color: 'white', bg: '#2C6E49', padding: '0 20px' }}
              fontSize="xs"
              px={6}
              py={2}
              data-testid={tab.id}
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
