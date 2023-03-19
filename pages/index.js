import React, { useEffect, useState } from 'react';
import { Highlight } from '@chakra-ui/react';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import { useAccount, useNetwork } from 'wagmi';
import { Input, Select } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { PinInput, PinInputField, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Aadhaar from '@/components/Aadhaar';
import License from '@/components/License';
import { Spinner } from '@chakra-ui/react';
import { app, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Web3Storage } from 'web3.storage';
import { useDisconnect } from 'wagmi';

const index = () => {
  const [sdoc, setSdoc] = useState('');
  const [loading, setLoading] = useState(false);
  const account = useAccount();
  const { disconnect } = useDisconnect();

  console.log(account.address);

  useEffect(() => {
    disconnect();
  }, []);

  const [docData, setDocData] = useState(null);

  const web3Storage = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2YWM2RDE0Njk0NzM1OTBBM0NGYzRFOEJlQjRDNjY0NmVhYTBCREIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzkxNTgzODM4MjAsIm5hbWUiOiJteVRva2VuIn0.lvMITWk8W1z_qcVzdv3GUM7SJkI-MOMMVt6RptOlQbU',
  });

  useEffect(() => {
    async function getData() {
      if (sdoc !== '' && account.address !== undefined) {
        const docRef = doc(firestore, 'users', account.address);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          const data = docSnap.data();
          if (sdoc === 'Aadhaar') {
            getAadhaarFromIPFS(data.aadhaar);
          } else {
            getLicenseFromIPFS(data.license);
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      }
    }

    getData();
  }, [sdoc, account.address]);

  async function getAadhaarFromIPFS(link) {
    axios.get(link).then((res) => {
      console.log(res.data);
      setDocData(res.data);
    });
  }

  async function getLicenseFromIPFS(link) {
    axios.get(link).then((res) => {
      console.log(res.data);
      setDocData(res.data);
    });
  }

  // const docData = {
  //   country: 'India',
  //   date_of_birth: '2001-08-13',
  //   district: 'Mumbai',
  //   document_type: 'AADHAAR',
  //   email: '4f2d574f30a2d5b1c4fbf85c7e7b37412984aff90a48939d877debc93a83b7c2',
  //   gender: 'MALE',
  //   house: 'K E M 328 1/3 KADAR KIRANA SHOP',
  //   landmark: 'BANDRA PLOT',
  //   locality: 'NEW BASTI',
  //   mobile: 'eda9cff5d11f0c0154946f665bfa2910d78d30c5fab0f66aa242c40c5cbb677b',
  //   name: 'Altamash Aslam Siddiqui',
  //   photo_base64:
  //     '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',
  //   pincode: '400060',
  //   post_office_name: 'Jogeshwari East',
  //   reference_id: '656020230318171202708',
  //   state: 'Maharashtra',
  //   street: 'NEAR ITTEHAD COMMITTEE',
  //   sub_district: 'Mumbai',
  //   vtc_name: 'Mumbai',
  //   xml_base64: 'UEsDBBQACQAIAEFdclYAAAAAAAAAAAAAAAAjAAAAb2ZmbGluZ',
  // };

  // const docData = {
  //   document_type: 'DRIVING_LICENSE',
  //   document_id: 'MH0320190027191',
  //   name: 'MOHAMMED SAIF SHAIKH',
  //   date_of_birth: '2001-07-08',
  //   dependent_name: 'MOHD MUSHAHID SHAIKH',
  //   address:
  //     'OM ADARSH CHS A-304 PLOT NO 6 SECT NO-2,DEONAR MUNICIPAL COLONY,GOVANDI MUMBAI',
  //   pincode: '400043',
  //   validity: {
  //     non_transport: {
  //       issue_date: '2019-09-26',
  //       expiry_date: '2041-07-07',
  //     },
  //   },
  //   rto_details: {
  //     state: 'Maharashtra',
  //     authority: 'RTO,MUMBAI (EAST)',
  //   },
  //   vehicle_class_details: [
  //     {
  //       category: 'MCWG',
  //       authority: 'RTO,MUMBAI (EAST)',
  //     },
  //     {
  //       category: 'LMV',
  //       authority: 'RTO,MUMBAI (EAST)',
  //     },
  //   ],
  //   photo_base64:
  //     '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',
  // };

  return (
    <div className='min-h-screen bg-slate-50 flex justify-center items-center flex-col'>
      <h1 className='text-9xl font-black text-black block mb-8'>🖼️ docNFT</h1>
      <div className='max-w-md mb-10 text-center mb-5'>
        <span className='bg-teal-200 text-2xl rounded-full p-2 px-5 flex items-center justify-between'>
          NFT Document Verification{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-8 h-8 ml-3'
          >
            <path
              fillRule='evenodd'
              d='M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
              clipRule='evenodd'
            />
          </svg>
        </span>{' '}
      </div>
      {account.address === undefined && sdoc === '' ? (
        <div className='max-w-md mx-auto flex items-center justify-center'>
          <Select
            placeholder='Select Document'
            size='lg'
            focusBorderColor='green.400'
            borderColor='green.400'
            borderWidth='2px'
            width='300px'
            onChange={(e) => setSdoc(e.target.value)}
          >
            <option value='Aadhaar'>Aadhaar</option>
            <option value='PAN Card'>PAN Card</option>
            <option value='Driving License'>Driving License</option>
            <option value='Passport'>Passport</option>
            <option value='Voter ID'>Voter ID</option>
          </Select>
        </div>
      ) : null}
      {sdoc !== '' && account.address === undefined ? (
        <div className='max-w-md mx-auto flex items-center justify-center'>
          <Web3Button />
        </div>
      ) : null}
      {sdoc === 'Aadhaar' && docData !== null ? (
        <div className='flex justify-center items-center mt-20'>
          <Aadhaar />
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            className='relative z-10'
            maxW='550px'
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={`data:image/png;base64,${docData.photo_base64}`}
              alt='Caffe Latte'
            />

            <Stack>
              <CardBody>
                <div className='flex items-center justify-between'>
                  <Heading size='lg'>{docData.name}</Heading>
                  <Image
                    objectFit='cover'
                    maxW={'50px'}
                    src='/aadhaar.svg'
                    alt='Caffe Latte'
                  />
                </div>

                {/* <Text pt='3'>
                <span className='font-bold'>Gender:</span> {docData.gender}
              </Text>
              <Text pt='2'>
                <span className='font-bold'>D.O.B:</span>{' '}
                {docData.date_of_birth}
              </Text>
              <Text pt='2'>
                <span className='font-bold'>Address:</span>{' '}
                {`${docData.house}, ${docData.street}, ${docData.landmark}, ${docData.locality}, ${docData.district}, ${docData.pincode}, ${docData.state}`}
              </Text> */}
                {/* <Heading size='md' pt='5' textAlign='center'>
                {aadhaar}
              </Heading> */}
              </CardBody>
            </Stack>
          </Card>
        </div>
      ) : sdoc === 'Driving License' && docData !== null ? (
        <div className='flex justify-center items-center mt-20'>
          <License />
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            className='relative z-10'
            maxW='550px'
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={`data:image/png;base64,${docData.photo_base64}`}
              alt='Caffe Latte'
            />

            <Stack>
              <CardBody>
                <div className='flex items-center justify-between'>
                  <Heading size='lg'>{docData.name}</Heading>
                  <div className='rounded-full m-1 mb-5 w-24'>
                    <Image src='/license.png' />
                  </div>
                </div>

                <Text pt='3'>
                  <span className='font-bold'>Vehicles:</span>{' '}
                  {docData.vehicle_class_details
                    .map((item) => item.category)
                    .map((item) => (
                      <Text display='inline' mr='1'>
                        {item}
                      </Text>
                    ))}
                </Text>
                {/* <Text pt='2'>
                  <span className='font-bold'>D.O.B:</span>{' '}
                  {docData.date_of_birth}
                </Text>
                <Text pt='2'>
                  <span className='font-bold'>Address:</span>{' '}
                  {docData.address}
                </Text> */}
              </CardBody>
            </Stack>
          </Card>
        </div>
      ) : docData === null &&
        account.address !== undefined &&
        loading === true ? (
        <Spinner />
      ) : null}
    </div>
  );
};

export default index;
