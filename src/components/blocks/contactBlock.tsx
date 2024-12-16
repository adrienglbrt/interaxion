import Link from "next/link";
import {
  GlobalContactAddressOne,
  GlobalContactAddressTwo,
} from "../../../tina/__generated__/types";

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
      <Link
        href={`mailto:${email}`}
        className='hover:opacity-70 transition-opacity duration-300'
      >
        {email}
      </Link>
    </div>
  );
}
