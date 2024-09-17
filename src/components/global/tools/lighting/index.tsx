'use client';

import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { Image as PhotoIcon } from 'lucide-react';
import { ImageAreaProps } from '@/lib/types';
import { Download, SparklesIcon, Trash, X } from 'lucide-react';
import Loader from '@/components/global/loader/progress-spinner';
import LoadingOverlay from '@/components/global/loader/loading-screen';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Input } from '@/components/ui/input';
import BillingNavbar from '../../navbar/navbar-store';

type ErrorNotificationProps = {
  errorMessage: string;
};

type ActionPanelProps = {
  isLoading: boolean;
  submitImage(): void;
};

type UploadedImageProps = {
  image: File;
  removeImage(): void;
};

type ImageOutputProps = ImageAreaProps & {
  loading: boolean;
  outputImage: string | null;
  downloadOutputImage(): void;
};

const acceptedFileTypes = {
  'image/jpeg': ['.jpeg', '.jpg', '.png'],
};

const maxFileSize = 5 * 1024 * 1024; // 5MB

function ErrorNotification({ errorMessage }: ErrorNotificationProps) {
  return (
    <div className='mx-4 mb-10 rounded-md bg-red-50 p-4 lg:mx-6 xl:mx-8'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <X className='h-5 w-5 text-red-400' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium text-red-800'>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}

function ActionPanel({ isLoading, submitImage }: ActionPanelProps) {
  const isDisabled = isLoading;

  return (
    <div className='mx-4 bg-gradient-to-tr from-themeDarkGray via-themeDarkGray/50 to-themeDarkGray shadow sm:rounded-lg lg:mx-6 xl:mx-8 border border-white '>
    {isLoading ?
    <div className='w-full h-full'>
      <LoadingOverlay>
        <p>Relighting the product...</p>
      </LoadingOverlay>
    </div>
  : <div className='px-4 py-5 sm:p-6'>
  <div className='sm:flex sm:items-start sm:justify-between'>
    <div>
      <h3 className='text-base font-semibold leading-6 text-gray-300 lg:text-xl'>
        Upload a photo or image
      </h3>
      <div className='mt-2 max-w-xl text-sm text-gray-500'>
        <p>
          Upload a PNG photo and add a prompt to create product images
        </p>
      </div>
    </div>
    <div className='mt-5 sm:ml-6 sm:mt-0 sm:flex flex-col space-y-3 sm:flex-shrink-0 sm:items-center lg:flex-row space-x-3'>
      <Input
        placeholder='A warm light in a cozy cottage setting'
      />
      <button
        type='button'
        disabled={isDisabled}
        onClick={submitImage}
        className={`${
          isDisabled
            ? 'cursor-not-allowed bg-emerald-600/60 text-gray-300 hover:bg-emerald-300/60 hover:text-gray-300'
            : 'bg-emerald-800/60 text-white'
        } inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:bg-emerald-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600/60 lg:px-3.5 lg:py-2.5`}
      >
        <p>Relight Image</p>
        <BillingNavbar/>
        {/* <SparklesIcon className='ml-2 h-4 w-4 text-gray-300' /> */}
      </button>
    </div>
  </div>
</div>
  }
    
  </div>
  );
}

function ImageOutput(props: ImageOutputProps) {
  return (
    <section className='relative w-full '>
      <div
        className={`${
          props.loading ? 'flex items-center justify-center' : ''
        } relative block h-[300px] w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {!props.outputImage && props.loading ? (
          <span className='flex flex-col items-center'>
            <Loader/>
            <span className='block text-sm font-semibold text-gray-300'>
              Processing the output image
            </span>
          </span>
        ) : null}

        {!props.outputImage && !props.loading ? (
          <>
             <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              
              src="/images/compare/input14.png"
              alt="Original image"
              loading="eager"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/images/compare/output14.webp"
              alt="Improved image"
              loading="eager"
            />
          }
          className="flex max-w-1/2 mx-auto rounded-lg size-full object-cover object-center"
          aria-roledescription="Image comparison slider"
          />
          </>
        ) : null}

        {!props.loading && props.outputImage ? (
          <img
            src={props.outputImage}
            alt='output'
            className='h-full w-full object-cover'
          />
        ) : null}
      </div>

      {!props.loading && props.outputImage ? (
        <button
          onClick={props.downloadOutputImage}
          className='group absolute right-1 top-1 bg-pink-700/60 p-2 text-white rounded'
        >
          <Download className='h-4 w-4 duration-300 group-hover:scale-110' />
        </button>
      ) : null}
    </section>
  );
}

function UploadedImage({ image, removeImage }: UploadedImageProps) {
  return (
    <section className='relative  h-[400px] w-full'>
      <button className='relative block h-[300px] w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
        <img
          src={URL.createObjectURL(image)}
          alt={image.name}
          className='h-full w-full object-cover'
        />
      </button>

      <button
        className='group absolute right-1 top-1 rounded bg-pink-700/60 p-2 text-white'
        onClick={removeImage}
      >
        <Trash className='h-4 w-4 duration-300 group-hover:scale-110' />
      </button>
    </section>
  );
}

function ImageDropzone(
  props: ImageAreaProps & {
    onImageDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]): void;
  }
) {
  return (
    <Dropzone
      onDrop={props.onImageDrop}
      accept={acceptedFileTypes}
      maxSize={maxFileSize}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <>
          <input {...getInputProps()} />
          <button
            {...getRootProps()}
            type='button'
            className='relative block h-[300px] w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <props.icon className='mx-auto h-12 w-12 text-gray-400' />
            <span className='mt-2 block text-sm font-semibold text-gray-300'>
              {props.title}
            </span>
          </button>
        </>
      )}
    </Dropzone>
  );
}

export default function LightingTool() {
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>('A cozy warm light')
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [file, setFile] = useState<File | null>(null);

  function onImageDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]) {
    // Check if any of the uploaded files are not valid
    if (rejectedFiles.length > 0) {
      console.info(rejectedFiles);
      setError('Please upload a PNG or JPEG image less than 5MB.');
      return;
    }

    removeImage();

    console.info(acceptedFiles);
    setError('');
    setFile(acceptedFiles[0]);

    // Convert to base64
    convertImageToBase64(acceptedFiles[0]);
  }

  function convertImageToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryStr = reader.result as string;
      setBase64Image(binaryStr);
    };
  }

  function removeImage() {
    setFile(null);
    setOutputImage(null);
  }



  async function submitImage() {
    if (!file) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);

    const response = await fetch('/api/tools/lighting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image: base64Image,
        //prompt: prompt,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    //let secondValue: string = result.output[1];

    setOutputImage(result.output);
    setLoading(false);
  }

  function downloadOutputImage() {
    saveAs(outputImage as string, 'output.png');
  }

  return (
    <main className='flex h-full flex-col'>
      {error ? <ErrorNotification errorMessage={error} /> : null}

      <ActionPanel isLoading={loading} submitImage={submitImage} />

      <section className='mt-10 grid flex-1 gap-6 px-4 lg:px-6 xl:grid-cols-2 xl:gap-8 xl:px-8'>
        {!file ? (
          <ImageDropzone
            title={`Drag 'n drop your image here or click to upload`}
            onImageDrop={onImageDrop}
            icon={PhotoIcon}
          />
        ) : (
          <UploadedImage image={file} removeImage={removeImage} />
        )}

        <ImageOutput
          title={`AI-generated output goes here`}
          downloadOutputImage={downloadOutputImage}
          outputImage={outputImage}
          icon={SparklesIcon}
          loading={loading}
        />
      </section>
    </main>
  );
}