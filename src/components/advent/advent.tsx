import React, { FC, ReactElement } from "react";
import { solution } from "./solutions/day6/solution-1";

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
