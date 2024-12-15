import { BsCheckCircle } from 'react-icons/bs'
import { BsDashCircleFill } from 'react-icons/bs'
import HTMLParser from 'html-react-parser'

export enum MessageType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

type RegistrationVerificationProps = {
  title: string
  text: string | React.ReactNode
  messageType?: MessageType
  actionText?: string
  actionUrl?: string
}

const RegistrationVerification: React.FC<RegistrationVerificationProps> = (props): JSX.Element => {
  const { SUCCESS } = MessageType
  return (
    <div className="d-flex flex-column align-items-center justify-content-center uzuri_section">
      {props.messageType === SUCCESS ? (
        <BsCheckCircle
          style={{
            color: '#000000',
            height: 100,
            width: 100,
          }}
          className="m-4 "
        />
      ) : (
        <BsDashCircleFill
          style={{
            color: '#aaaaaa',
            height: 100,
            width: 100,
          }}
          className="m-4 "
        />
      )}
      <p className="text24 fowe700 mabo32 black">{props.title}</p>
      <div style={{ textAlign: 'center' }}>
        {typeof props.text === 'string' ? (
          <p className="text14 fowe500 gray mabo64">{HTMLParser(props.text)}</p>
        ) : (
          props.text
        )}
      </div>
    </div>
  )
}

export default RegistrationVerification
