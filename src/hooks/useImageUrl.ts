const modules = import.meta.globEager("../assets/images/**/*.{png,jpg,jpeg,gif,webp}");
const useImageUrl = (path: string) => modules[path.replace("@/", "../")].default;
export {useImageUrl};
