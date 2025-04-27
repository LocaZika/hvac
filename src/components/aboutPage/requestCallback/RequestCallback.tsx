'use client'
import { Container, Grid, useMediaQuery } from '@mui/material';
import callBackStyle from './requestCallback.module.scss';
import Link from 'next/link';
import Select from '@components/select/Select';
import requestCallbackAction from '@actions/requestCallback.action';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { isValidEmail, isValidPhoneNumber } from '@utils/validator.utils';

interface IInputFields {
  name: string;
  email: string;
  phone: string;
  service: string;
}
export default function RequestCallback() {
  const mediaQuery = useMediaQuery('(max-width: 576px)');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [inputFields, setInputFields] = useState<IInputFields>(
    {
      name: '',
      email: '',
      phone: '',
      service: '',
    },
  );
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFields({...inputFields, name: e.target.value });
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFields({...inputFields, email: e.target.value });
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFields({...inputFields, phone: e.target.value });
  }
  const handleServiceChange = (value: string) => {
    setInputFields({...inputFields, service: value });
  }
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if ( inputFields.name.trim() === '' ) {
      return toast.error('Please enter your name');
    }
    if ( inputFields.email.trim() !== '' ) {
      if ( !isValidEmail(inputFields.email) ) {
        return toast.error('Please enter a valid email');
      }
    } else {
      return toast.error('Please enter a email address');
    }
    if ( inputFields.phone.trim() !== '' ) {
      if ( !isValidPhoneNumber(inputFields.phone) ) {
        return toast.error('Please enter a valid phone number');
      }
    } else {
      return toast.error('Please enter a phone number');
    }
    if ( inputFields.service === '' ) {
      return toast.error('Please choose a service');
    }
    const formData = new FormData();
    formData.set('name', inputFields.name);
    formData.set('email', inputFields.email);
    formData.set('phone', inputFields.phone);
    formData.set('service', inputFields.service);
    setIsPending(true);
    const res = await requestCallbackAction(formData);
    if ( !res.ok || res.statusCode !== 200 ) {
      setIsPending(false);
      return toast.error('Request a callback was sent unsuccessful. please try again later');
    }
    setIsPending(false);
    return toast.success('Request a callback was sent successful. We will contact you soon');
  }
  return (
    <section className={`${callBackStyle['container']} set-bg spad`}>
      <Container>
        <Grid container>
          <Grid item md={6} lg={5} paddingX={mediaQuery ? 0 : '1.5rem'}>
            <div className={callBackStyle['text']}>
              <div className="section-title">
                <h2>request a call back</h2>
                <p>
                  Posters had been a very beneficial marketing tool because it had paved to deliver an
                  effective message that conveyed customer&lsquo;s
                </p>
              </div>
              <Link href={'/contact'}>contact us</Link>
            </div>
          </Grid>
          <Grid item lg={1}></Grid>
          <Grid item md={6} lg={6}>
            <form onSubmit={handleSubmit} className={callBackStyle['form']}>
              <Grid container>
                <Grid item xs={12} lg={6} paddingX={mediaQuery ? 0 : '1.5rem'}>
                  <input type="text" name='name' placeholder="Name" onChange={handleNameChange} />
                </Grid>
                <Grid item xs={12} lg={6} paddingX={mediaQuery ? 0 : '1.5rem'}>
                  <input type="email" name='email' placeholder="Email" onChange={handleEmailChange} />
                </Grid>
                <Grid item xs={12} lg={6} paddingX={mediaQuery ? 0 : '1.5rem'}>
                  <input type="tel" name='phone' placeholder="Phone" onChange={handlePhoneChange} />
                </Grid>
                <Grid item xs={12} lg={6} paddingX={mediaQuery ? 0 : '1.5rem'}>
                  <Select
                    values={['buy cars', 'sell cars', 'wash cars']}
                    label='choose our services'
                    name='service'
                    hideLabel={true}
                    className={callBackStyle['select']}
                    handleChange={handleServiceChange}
                  />
                </Grid>
              </Grid>
              <button type="submit" disabled={isPending}>submit now</button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
