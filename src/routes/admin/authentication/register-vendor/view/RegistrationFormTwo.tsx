import fb from '@/assets/icon/fb.png';
import tiktok from '@/assets/icon/tiktok.png';
import ig from '@/assets/icon/ig.png';
import website from '@/assets/icon/website.png';
import { Form, Input } from 'antd';

const RegistrationFormTwo = () => {
  return (
    <>
      <Form.Item className="my-[8px]" name={'website'} label="Website">
        <Input
          prefix={<img src={website} alt="website" />}
          placeholder="https://website.com"
          className="text-caption-1 h-[40px]"
        />
      </Form.Item>
      <Form.Item className="my-[8px]" name={'tiktok'} label="Tiktok">
        <Input
          prefix={<img src={tiktok} alt="website" />}
          placeholder="https://www.tiktok.com/@test"
          className="text-caption-1 h-[40px]"
        />
      </Form.Item>
      <Form.Item className="my-[8px]" name={'instagram'} label="Instagram">
        <Input
          prefix={<img src={ig} alt="website" />}
          placeholder="https://www.instagram.com/@test"
          className="text-caption-1 h-[40px]"
        />
      </Form.Item>
      <Form.Item className="my-[8px]" name={'facebook'} label="Facebook">
        <Input
          prefix={<img src={fb} alt="website" />}
          placeholder="https://www.facebook.com/@test"
          className="text-caption-1 h-[40px]"
        />
      </Form.Item>
    </>
  );
};

export default RegistrationFormTwo;
