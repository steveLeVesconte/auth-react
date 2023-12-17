import { Box, Flex } from "@chakra-ui/react";
import styles from "./game-board-w-labels.module.css";

const LetterLabelRow = () => {
  const content = [];
  const letters = "ABCDEFGHIJKLMNOPQRS";
  for (let column = 0; column < 19; column++) {
    content.push(
      <div key={column} className={styles.colLetterLabel}>
        {letters[column]}
      </div>
    );
  }
  return (
    <Box>
      {" "}
      <Flex gap={0}>{content}</Flex>
    </Box>
  );
};

export default LetterLabelRow;
