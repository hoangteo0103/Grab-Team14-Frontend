import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import Divider from '../../../common/Divider';
import { formatDate } from '../../../../utils/formatter';
import JobDetailModal from './JobDetailModal';
import assets from '../../../../assets';

const JobDetail = ({ label, data }) => (
  <div className="flex flex-col">
    <p className="text-sm text-prim-1">{label}</p>
    <p className="text-base font-extralight">{data}</p>
  </div>
);

const JobInfo = ({ postedDate, jobType, industry }) => (
  <div className="flex flex-row justify-between w-full">
    <JobDetail label="Posted date" data={postedDate} />
    <Divider vertical />
    <JobDetail label="Type" data={jobType} />
    <Divider vertical />
    <JobDetail label="Industry" data={industry} />
  </div>
);

const JobHeader = ({ logo, title, level }) => (
  <div className="flex flex-row items-center justify-center gap-4">
    <img src={logo} alt="job" className="w-12 h-12 rounded-md" />
    <div className="flex flex-col justify-between h-full">
      <p className="text-xl font-semibold text-prim-1">{title}</p>
      {level && <p className="text-sm font-light text-prim-1">{level}</p>}
    </div>
  </div>
);

const JobLocation = ({ location, arrangement }) => (
  <div className="flex flex-col w-full gap-4">
    <Divider />
    <div className="flex justify-between w-full">
      <div className="flex items-center justify-center gap-2">
        <MapPinIcon className="w-6 h-6 text-prim-1" />
        <p>{location}</p>
      </div>
      <p className="text-prim-1">{arrangement}</p>
    </div>
  </div>
);

const JobCard = ({ jobData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="flex flex-col items-start justify-between w-full gap-6 p-6 bg-white border shadow-md rounded-xl hover:shadow-xl hover:cursor-pointer"
        onClick={handleOpenModal}
      >
        <JobInfo
          postedDate={formatDate(jobData?.date)}
          jobType={jobData?.type}
          industry={jobData?.industry}
        />
        <JobHeader
          logo={jobData?.companyImageUrl || assets.logo_svg}
          title={jobData?.title}
          level={jobData?.experienceLevel}
        />
        <JobLocation
          location={jobData?.location}
          arrangement={jobData?.workingMode}
        />
      </div>
      <JobDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobData={jobData}
      />
    </>
  );
};

export default JobCard;
