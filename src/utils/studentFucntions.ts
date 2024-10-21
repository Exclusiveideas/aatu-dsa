import axios from "axios";
import download from "downloadjs";


export const handleDownloadFile = async(downloadUrl: string, fileName: string) => {
    if(!downloadUrl) {
      console.log('no file to download')
      return;
    }

    const filename = fileName;
    const res = await axios.get(
      downloadUrl,
      {
        responseType: "blob",
      }
    );
    const data = res.data as Blob;
    download(data, filename);
  }