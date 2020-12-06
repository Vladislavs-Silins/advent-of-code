import React, { FC, ReactElement } from "react";
import { solution } from "./solutions/day2/solution-2";

interface Props {
  data: string;
}

export const Advent: FC<Props> = ({ data }: Props): ReactElement => {
  const result = solution();
  return (
    <div>
      <h2>{result}</h2>
    </div>
  );
};
