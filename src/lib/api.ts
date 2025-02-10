import axios from "axios";

const GET = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleCvData = async (id: string) => {
  return GET(`/api/cv/${id}`);
};

export const fetchUserData = async () => {
  return GET(`/api/user`);
};
