import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Container, Form, Input, Button } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import PageLayout from '../components/page-layout';
import ValidationError from '../components/validation-error';
import IEventInfo from '../data/event-info';

const NewEvent: React.FC = () => {
  const {
    control,
    setValue,
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IEventInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  
  const createEvent: SubmitHandler<IEventInfo> = (data) => {
    setLoading(true);
    console.log(data);
  }

  const handleDateChange = (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
    setValue('date', data.value);
  }

  return (
    <PageLayout>
      <Container style={{marginTop: 40}}>
        <h2>Create a New Event</h2>
        <Form onSubmit={handleSubmit(createEvent)} error={true}>
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
            render={({ field }) => <DateTimeInput {...field} onChange={handleDateChange} /> }
          />
          
          <ValidationError error={errors.date} message='Event date is required.' />

          <label>Ticket price</label>
          <Input
            label="wei"
            labelPosition="right"
            type='number'
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
        <Button primary loading={loading} floated='right'>Create</Button>
        <Link to='/'>
          <Button floated='right'>Cancel</Button>
        </Link>
      </Form>
      </Container>
    </PageLayout>
  )
}

export default NewEvent;