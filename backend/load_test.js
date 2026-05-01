import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10, // 10 virtual users
  duration: '30s', // run for 30 seconds
};

export default function () {
  // Replace with your actual local endpoint
  const res = http.get('http://localhost:3000'); 
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}