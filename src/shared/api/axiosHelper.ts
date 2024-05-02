import axios from "axios";
import { useRouter as useNextRouter } from "next/navigation";

export function useRouter() {
  const router = useNextRouter();

  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.error("Ошибка при отправке запроса:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          console.error("Ошибка на сервере:", error.response.data);
          alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
        } else if (error.response.status === 201) {
          console.log("Успешно сохранено:", error.response.data);
          await router.push("/routs/congru");
        }
      } else if (error.request) {
        console.error("Ошибка запроса:", error.request);
        alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      } else {
        console.error("Ошибка:", error.message);
        alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
      }
      return Promise.reject(error);
    }
  );

  return router;
}
