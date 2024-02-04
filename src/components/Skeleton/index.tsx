import { Box, Container, Skeleton, Table } from "@mui/joy";
import { Column } from "../../data/columns";

interface TableSkeletonProps {
  columns: Column[];
}

export const TableSkeleton = ({ columns }: TableSkeletonProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{ width: "100%", minHeight: 380, height: "100%", borderRadius: 3 }}
      >
        <Table stickyHeader aria-label="sticky table">
          <thead>
            <tr>
              {columns.map((column) => (
                <td
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    fontFamily: "Poppins",
                    fontSize: 16,
                  }}
                >
                  <Skeleton animation="wave" variant="text" />
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} style={{ alignItems: "center" }}>
                <td
                  key={index + "status"}
                  align="center"
                  style={{ justifyItems: "center", display: "flex" }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={25}
                    height={25}
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.id}>
                    <Skeleton animation="wave" variant="text" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Box>
  );
};
