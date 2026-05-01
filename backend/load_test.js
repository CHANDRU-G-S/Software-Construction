import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  try {
    const res = http.get('http://localhost:3000');

    const isSuccess = check(res, {
      'status is 200': (r) => r.status === 200,
      'response received': (r) => r && r.status !== 0,
    });

    if (!isSuccess) {
      console.error(`Request failed. Status: ${res.status}`);
    }

  } catch (error) {
    console.error(`Connection error: ${error.message}`);
  }

  sleep(1);
}