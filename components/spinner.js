export default function Spinner(search) {
  return search ? (
    <div className="h-6 w-6 animate-spin rounded-full border-t-[1px] border-l-[1px] dark:border-green-300 border-green-500 " />
  ) : (
    <div className="mt-12 h-32 w-32 animate-spin rounded-full border-t-4 border-l-4 border-green-300" />
  );
}
