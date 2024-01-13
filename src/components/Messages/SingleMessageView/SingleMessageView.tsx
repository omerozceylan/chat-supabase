import { SingleMessageViewTypes } from "../messagesType.d";

export default function SingleMessageView({
  message,
  userName,
}: SingleMessageViewTypes) {
  return (
    <div>
      <div>
        {userName} : {message}
      </div>
    </div>
  );
}
