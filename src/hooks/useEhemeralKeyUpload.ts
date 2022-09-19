import COS from "cos-js-sdk-v5";
import {useEnv} from "@/hooks/useEnv";
// import {getEhemeralKey} from "@/api/common";

const cosConfig = (file: any) => {
  return {
    Bucket: "",
    Region: "",
    Key: `/${useEnv("production") ? "dist" : "test"}/vite2-vue3.x-typescript-arco-framework/uploads/${Date.now()}${
      file.name
    }`,
  };
};

export const useEhemeralKeyUpload = (file: any) => {
  return new Promise((resolve, reject) => {
    // 获取临时密钥实例化COS对象
    const cos = new COS({
      async getAuthorization(options, callback) {
        let PARAMS: any = {};
        try {
          // const res = await getEhemeralKey();
          PARAMS = {
            TmpSecretId: "",
            TmpSecretKey: "",
            SecurityToken: "",
            StartTime: 0,
            ExpiredTime: 0,
          };
          callback(PARAMS);
        } catch (error: any) {
          console.error(error.message);
        }
      },
    });
    // 上传文件
    cos.putObject(
      {
        ...cosConfig(file),
        Body: file,
        // onHashProgress(progressData) {
        //     console.log("校验中", JSON.stringify(progressData));
        // },
        // onProgress(progressData) {
        //     console.log("上传中", JSON.stringify(progressData));
        // },
      },
      (err, data) => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        }
        // 上传成功
        resolve({
          name: file.name,
          url: `https://${data.Location}`,
        });
      },
    );
  });
};
