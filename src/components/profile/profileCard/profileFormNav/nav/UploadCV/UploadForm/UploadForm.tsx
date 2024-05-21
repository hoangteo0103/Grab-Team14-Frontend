
import { useTranslation } from 'react-i18next';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { BaseSlider } from '@app/components/common/BaseSlider/BaseSlider';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseRate } from '@app/components/common/BaseRate/BaseRate';
import { notificationController } from '@app/controllers/notificationController';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseCheckbox } from '@app/components/common/BaseCheckbox/BaseCheckbox';
import * as S from './UploadForm.style';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import axios from 'axios';
import { getSignUrl } from '@app/api/media';
import { RcFile } from 'antd/lib/upload';
import { Progress } from 'antd';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  console.log(e.fileList)
  return e && e.fileList;
};

export const UploadForm: React.FC = () => {
  const [isFieldsChangedCover, setFieldsChangedCover] = useState(false);
  const [isFieldsChangedCV, setFieldsChangedCV] = useState(false);
  const [isLoadingCV, setLoadingCV] = useState(false);
  const [isLoadingCover, setLoadingCover] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number>();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onFinish = async (values = {}) => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setFieldsChanged(false);
    //   notificationController.success({ message: t('common.success') });
    //   console.log(values);
    // }, 1000);
  };

  const onUploadFile = ({ file }: { file: string | Blob | RcFile }) => {
    if (file instanceof File) {
      getSignUrl({ fileName: file.name, contentType: file.type, isPublic: true })
      .then( async data => {
        const urlObj = new URL(data.url);
        const url = `${urlObj.origin}${urlObj.pathname}`;
        await axios.put(data.url, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: (progressEvent) => {

            console.log(progressEvent.loaded, progressEvent.total)
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setProgress(percentCompleted);
              if (percentCompleted === 100) {
                timeoutRef.current = window.setTimeout(() => setProgress(0), 1000);
              }
            }
          },
        }).then((data) => {
          console.log(data)
          console.log("https://grabbootcamp.s3.ap-southeast-1.amazonaws.com/" + "1")
          notificationController.success({ message: t('common.success') });
        });
      })
    } 
  };

  return (
    <BaseForm>
    <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChangedCV}
      onFieldsChange={() => setFieldsChangedCV(true)}
      name="validateForm"
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
      footer={
        <BaseButtonsForm.Item>
          <BaseButton type="primary" htmlType="submit" loading={isLoadingCV}>
            {t('common.submit')}
          </BaseButton>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >

    <BaseButtonsForm.Item label={t('forms.uploadFormLabels.cv')}>
        <BaseButtonsForm.Item name="cv" valuePropName="fileList" getValueFromEvent={normFile} noStyle >
        <BaseUpload.Dragger name="files" customRequest={onUploadFile} multiple={false} maxCount={1} onChange={(file) =>   file.fileList.filter((x)=>x.status = "done")
}>
            <p>
              <InboxOutlined />
            </p>
            <p>{t('forms.uploadFormLabels.clickToDrag')}</p>
            <p>{t('forms.uploadFormLabels.supportSingle')}</p>

            {!!progress && <Progress percent={progress} />}

          </BaseUpload.Dragger>
        </BaseButtonsForm.Item>
      </BaseButtonsForm.Item> 
      </BaseButtonsForm>

      <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChangedCover}
      onFieldsChange={() => setFieldsChangedCover(true)}
      name="validateForm"
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
      footer={
        <BaseButtonsForm.Item>
          <BaseButton type="primary" htmlType="submit" loading={isLoadingCover}>
            {t('common.submit')}
          </BaseButton>
        </BaseButtonsForm.Item>
      }
      onFinish={onFinish}
    >
      <BaseButtonsForm.Item label={t('forms.uploadFormLabels.coverLetter')} name = "coverLetter````````````````````````````````````````````````````````````````````````````````````````````````">
          <S.InputsWrapper>
            <BaseInput.TextArea rows={10} cols = {20} maxLength={24} />
          </S.InputsWrapper>
      </BaseButtonsForm.Item> 
    </BaseButtonsForm>
    </BaseForm>
  );
};