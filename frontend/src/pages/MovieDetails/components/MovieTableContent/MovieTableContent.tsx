import React from 'react';
import { Box, Rating, Table, TableBody, TableCell } from '@mui/material';
import {
  StyledDescriptionTitle,
  StyledMovieContent,
  StyledMovieKey,
  StyledMovieTitle,
  StyledMovieValue,
  StyledTableRow,
} from './styled';

type MovieTableContentProps = {
  date: string;
  categories: string;
  title: string;
  duration: number;
  grade: number;
  description: string;
};

export const MovieTableContent = (props: MovieTableContentProps) => {
  const { date, categories, title, duration, grade, description } = props;

  return (
    <StyledMovieContent>
      <StyledMovieTitle>{title}</StyledMovieTitle>
      <Table sx={{ maxWidth: 600, marginBottom: '32px' }}>
        <TableBody>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey>Release date:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <StyledMovieValue>{date}</StyledMovieValue>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey>Duration:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <StyledMovieValue>{duration} min.</StyledMovieValue>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey>Grade:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <Rating value={grade} precision={0.5} readOnly />
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <StyledMovieKey>Categories:</StyledMovieKey>
            </TableCell>
            <TableCell>
              <StyledMovieValue>{categories}</StyledMovieValue>
            </TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Box>
        <StyledDescriptionTitle>Film description:</StyledDescriptionTitle>
        <StyledMovieValue>{description}</StyledMovieValue>
      </Box>
    </StyledMovieContent>
  );
};
