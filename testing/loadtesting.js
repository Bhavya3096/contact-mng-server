import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 50,        
  duration: "30s",
};

const TOKEN = "6a22bebaa379eb63c27d5552";

export default function () {
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  const res = http.get(
    "http://localhost:5000/contactmng/contacts",
    params
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}