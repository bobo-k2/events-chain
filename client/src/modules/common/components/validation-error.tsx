import React, { Fragment } from 'react';
import { Message } from '../../common/components';
import { FieldError } from 'react-hook-form';

const ValidationError: React.FC<Props> = ({
  error,
  message
}) => {
  return(
    <Fragment>
      {error 
        ? <Message icon color='red'>
            <Message.Content>
              {message}
            </Message.Content>
          </Message>
        : null
      }
    </Fragment>
  );
}

type Props = {
  error: FieldError | undefined,
  message: string
}

export default ValidationError;