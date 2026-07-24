import { Button, Flex, Text } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../store/slice/filterSlice";

export default function Pagination({ pageCount }) {
  const page = useSelector((state) => state.filter.page);
  const dispatch = useDispatch();

  const getPages = () => {
    const pages = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return pages;
    }

    // начало
    if (page <= 3) {
      return [1, 2, 3, 4, "...", pageCount];
    }

    // конец
    if (page >= pageCount - 2) {
      return [1, "...", pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    }

    // середина
    return [1, "...", page - 1, page, page + 1, "...", pageCount];
  };

  const pages = getPages();

  return (
    <Flex gap="2" mt="4" justify="center" align="center">
      <Button
        disabled={page === 1}
        onClick={() => dispatch(changePage(page - 1))}
      >
        Назад
      </Button>

      {pages.map((item, index) =>
        item === "..." ? (
          <Text key={`dots-${index}`}>...</Text>
        ) : (
          <Button
            key={`${item}-${index}`}
            size="1"
            variant={page === item ? "solid" : "soft"}
            onClick={() => dispatch(changePage(item))}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        disabled={page === pageCount}
        onClick={() => dispatch(changePage(page + 1))}
      >
        Вперед
      </Button>
    </Flex>
  );
}
