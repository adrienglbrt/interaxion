import {
  GlobalContactAddressOne,
  GlobalContactAddressTwo,
} from "../../../tina/__generated__/types";
import AnimatedUnderlineLink from "../ui/animatedUnderlineLink";

export default function ContactBlock({
  address,
  email,
}: {
  address: GlobalContactAddressOne | GlobalContactAddressTwo;
  email: string;
}) {
  return (
    <div className='pt-4 leading-relaxed'>
      <p>{address.addressLineOne}</p>
      <p>{address.addressLineTwo}</p>
      <p>{address.postCode + ", " + address.city + " / " + address.country}</p>
      <p>{address.phone}</p>
      <AnimatedUnderlineLink href={`mailto:${email}`}>
        {email}
      </AnimatedUnderlineLink>
    </div>
  );
}
