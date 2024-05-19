import { useState } from 'react';
import BaseModal from '../../../common/BaseModel';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import BaseButton from '../../../common/BaseButton';
import FilterModalSidebar from './FilterModalSidebar';
import MainFilter from './section/MainFilter';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
// import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import AdvancedFilter from './section/AdvancedFilter';

const FilterModalToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('main');

  const handleOpenModal = () => {
    setCurrentSection(sections[0].id);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const sections = [
    {
      id: 'main',
      label: 'Filters',
      icon: <FunnelIcon className="w-5 h-5 text-prim-1" />,
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: <WrenchScrewdriverIcon className="w-5 h-5 text-prim-1" />,
    },
  ];

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'main':
        return <MainFilter />;
      case 'advanced':
        return <AdvancedFilter />;
      default:
        return null;
    }
  };

  const getCurrentSectionLabel = () => {
    const section = sections.find((sec) => sec.id === currentSection);
    return section ? (
      <p className="text-xl font-semibold text-prim-1">{section.label}</p>
    ) : null;
  };

  return (
    <>
      <BaseButton onClick={handleOpenModal}>
        <AdjustmentsHorizontalIcon className="w-6 h-6" />
        <p className="font-semibold">Filters</p>
      </BaseButton>

      <BaseModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col w-full max-h-screen overflow-y-auto md:overflow-y-hidden md:flex-row">
          <FilterModalSidebar
            sections={sections}
            currentSection={currentSection}
            onSelectSection={setCurrentSection}
          />
          <div className="flex flex-col w-full h-full md:h-auto">
            <div className="flex items-center justify-between w-full p-4 border-b-2">
              {getCurrentSectionLabel()}
              <XMarkIcon
                onClick={handleCloseModal}
                className="w-8 h-8 p-1 rounded-full cursor-pointer text-prim-1 hover:bg-gray-100"
              />
            </div>
            <div className="w-full p-4 bg-gray-50 md:overflow-y-auto md:bg-white">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default FilterModalToggle;
