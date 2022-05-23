import React, { useEffect } from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Container,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import DownloadForOfflineIcon from "@material-ui/icons/ArrowDownwardRounded";
import { DELETE_PDF_RESET } from "../../redux/constants/pdfConstants";
import { useRouter } from "next/router";

import {
  getPdfs,
  deletePdfs,
  clearError,
} from "../../redux/actions/pdfActions";
const useStyles = makeStyles((theme) => ({
  tit: {
    "& p": {
      fontFamily: "Poppins",
    },
  },
}));
const Pdfs = () => {
  const { pdf, err } = useSelector((state) => state.Pdfs);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletePdf
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPdfs());

    if (err) {
      toast.error(err);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      router.push("/admin/pdfs");
      dispatch({ type: DELETE_PDF_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

  const deletePdfHandler = (id) => {
    dispatch(deletePdfs(id))
}

  return (
    <Container maxWidth="md">
      <p>All Pdfs</p>
      <TableContainer component={Paper}>
        <Table className={classes.tit}>
          <TableHead>
            <TableRow>
            
              <TableCell>
                <p>Name</p>
              </TableCell>
            
              <TableCell>
                <p>Url</p>
              </TableCell>
              <TableCell>
                <p>Delete</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pdf &&
              pdf.map((pdf) => (
                <TableRow>
            
                  <TableCell>
                    <p>{pdf.name}</p>
                  </TableCell>
                  <TableCell>
                    <a
                      href={pdf.pdfs?.url}
                      target="_blank"
                      // class="butn butn-bg mt-30"
                      download
                    >
                      <Button variant="contained" className={classes.btn}>
                        <DownloadForOfflineIcon /> Download
                      </Button>
                    </a>

                  </TableCell>
                  <TableCell>
                    <p></p>
                  </TableCell>

                  <TableCell>
                    <DeleteIcon onClick={() => deletePdfHandler(pdf._id)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Pdfs;
