import React, { SyntheticEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Container, Form, Input, Button, Message } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import PageLayout from '../components/page-layout';
import ValidationError from '../components/validation-error';
import { IEventInfo, IEventDbInfo } from '../data/event-info';
import eventFactoryContract from '../event-factory-contract';
import { signer } from '../web3';
import { WalletProps } from '../data/wallet-props';
import { ethers } from 'ethers';

const NewEvent: React.FC<WalletProps> = (props) => {
  const {
    control,
    setValue,
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IEventInfo>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const createEvent: SubmitHandler<IEventInfo> = async (data): Promise<void> => {
    setLoading(true);
    setErrorMessage('');

    try {
      console.log(ethers.utils.parseEther(data.ticketPrice).toString());
      const ticketPrice = ethers.utils.parseEther(data.ticketPrice).toString();

      const transaction = await eventFactoryContract
        .connect(signer)
        .createEvent(
          ticketPrice,
          data.ticketsCount
        );
      await transaction.wait();

      // TODO not the best idea, see how to get address of deployed Event contract.
      const events: string[] = await eventFactoryContract.getEvents();
      
      let requestData: IEventDbInfo = {
        name: data.name,
        venue: data.venue,
        ticketPrice,
        date: Date.parse(data.date),
        contractAddress: events[events.length - 1]
      };

      await fetch('/api/events', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }),
        body: JSON.stringify(requestData)
      })

      history.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  }

  const handleDateChange = (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
    setValue('date', data.value);
  }

  return (
    <PageLayout {...props}>
      <Container style={{marginTop: 40}}>
        <h2>Create a New Event</h2>
        <Form onSubmit={handleSubmit(createEvent)} error={!!errorMessage}>
        <Form.Field>
          <label>Name</label>
          <Input {...register('name', { required: true, maxLength: 100 })}/>
          <ValidationError error={errors.name} message='Event name is required.' />

          <label>Venue</label>
          <Input {...register('venue', { required: true, maxLength: 100 })} />
          <ValidationError error={errors.venue} message='Venue name is required.' />

          <label>Date and time</label>
          <Controller
            name='date'
            control={control}
            rules={{ required: true }}
            render={({ field }) => 
              <DateTimeInput
                {...field}
                onChange={handleDateChange}
                dateFormat='yyyy-MM-DD'
                minDate={new Date()}
                value=''
              />
            }
          />
          
          <ValidationError error={errors.date} message='Event date is required.' />

          <label>Ticket price</label>
          <Input
            label="ETH"
            labelPosition="right"
            type='number'
            step='0.000000000000000001'
            {...register('ticketPrice', { required:true })}
          />
          <ValidationError error={errors.ticketPrice} message='Ticket price is required.' />

          <label>Number of available tickets</label>
          <Input
            type='number'
            {...register('ticketsCount', { required:true })}
          />
          <ValidationError error={errors.ticketsCount} message='Number of available tickets is required.' />
        </Form.Field>
        
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading} floated='right'>Create</Button>
        <Link to='/'>
          <Button floated='right' disabled={loading}>Cancel</Button>
        </Link>
      </Form>
      </Container>
    </PageLayout>
  )
}

export default NewEvent;