import React, { useState } from 'react';
import { Dates } from '@app/constants/Dates';
import { BaseHashTag, IHashTag } from '../BaseHashTag/BaseHashTag';
import { BaseImage } from '../BaseImage/BaseImage';
import { BaseAvatar } from '../BaseAvatar/BaseAvatar';
import * as S from './BaseJob.styles';
import { BaseModal } from '../BaseModal/BaseModal';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '../BaseButton/BaseButton';
import { JobDetail } from '@app/components/jobDetail/JobDetail';
import { formatDate } from '@app/utils/utils';

export interface IJobData {
  applyLink?: string;
  company?: string;
  companyImageUrl?: string;
  companyLink?: string;
  companyLocation?: string;
  date?: string;
  description?: string;
  experience?: string;
  id: string;
  industry?: string[];
  jobLink?: string;
  location?: string;
  platform?: string;
  requirements?: string[];
  title: string;
  type?: string;
}

export interface BaseJobProps {
  jobData: IJobData;
}

export const BaseJob: React.FC<BaseJobProps> = ({ jobData }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOnCardClick = () => {
    setModalOpen(true);
    console.log('Data: ', jobData);
  };

  // Log jobData to verify the structure
  console.log('Job Data:', jobData);

  return (
    <>
      <S.JobCard onClick={handleOnCardClick}>
        <S.Wrapper>
          <S.ImgWrapper>
            <img
              src={jobData.companyImageUrl}
              alt={jobData.company}
              width={84}
              height={84}
              onError={(e) => (e.currentTarget.src = 'path/to/placeholder.png')}
            />
          </S.ImgWrapper>

          <S.InfoWrapper>
            <S.InfoHeaderWrapper>
              <S.TitleWrapper>
                <S.Title level={5}>{jobData.title}</S.Title>
              </S.TitleWrapper>
              <S.LabelWrapper>
                {jobData.type && jobData.type !== 'ANY' ? <S.Label>{jobData.type}</S.Label> : null}

                {jobData.experience && <S.Label>{jobData.experience}</S.Label>}
              </S.LabelWrapper>
            </S.InfoHeaderWrapper>

            <S.InfoBottomWrapper>
              <S.Text>{jobData.location ? jobData.location : 'Location provided'}</S.Text>
              <S.DateText>{jobData.date ? formatDate(jobData.date) : 'No Date'}</S.DateText>
            </S.InfoBottomWrapper>
          </S.InfoWrapper>
        </S.Wrapper>
      </S.JobCard>
      <BaseModal
        centered
        open={isModalOpen}
        onOk={(e) => {
          e.stopPropagation();
          setModalOpen(false);
        }}
        onCancel={(e) => {
          e.stopPropagation();
          setModalOpen(false);
        }}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        // width={'100%'}
      >
        <JobDetail id={jobData.id} />
      </BaseModal>
    </>
  );
};