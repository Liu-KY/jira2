import { useMemo } from "react";

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  const arr = useMemo(() => {
    return name.split(keyword);
  }, [name, keyword]);

  if (!keyword) return <>{name}</>;
  console.log(arr);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
