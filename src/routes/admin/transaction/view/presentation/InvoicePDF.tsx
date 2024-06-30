import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import PrimaryLogo from '@/assets/default-profile-image.png';
import formatToIDR from '@/shared/usecase/formatToIDR';

interface IInvoicePDF {
  submittedOn: string;
  invoiceNo: string;
  customer: string;
  date: string;
  vendor: string;
  productList: any[];
  grandTotal?: number;
}

const styles = StyleSheet.create({
  page: {
    borderRadius: '8px',
    borderTop: '8px solid #850362',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontSize: '16px',
    padding: '20px',
  },
  logoText: {
    fontSize: '18px',
    color: '#F76A8B',
    fontWeight: 500,
    fontStyle: 'italic',
  },
  flexColWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 700,
  },
  headerDate: {
    fontWeight: 600,
    color: '#949494',
  },
  detailRow: {
    display: 'flex',
  },
  detailItemWrapper: {
    flexBasis: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  detailHeader: {
    fontSize: '18px',
    fontWeight: 600,
  },
  detailBody: {
    color: '#949494',
  },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeadWrapper: {
    display: 'flex',
    gap: '2px',
    backgroundColor: '#F9FBFC',
    color: '#949494',
    fontWeight: 600,
    padding: '14px 20px',
    borderTop: '1px solid #E2E2E2',
    borderBottom: '1px solid #E2E2E2',
  },
  tableRowWrapper: {
    display: 'flex',
    gap: '2px',
    padding: '14px 20px',
    borderBottom: '1px solid #E2E2E2',
  },
  tableFirstColumn: {
    flexBasis: '20%',
  },
  tableSecondColumn: {
    flexBasis: '50%',
  },
  tableThirdColumn: {
    flexBasis: '15%',
  },
  tableFourthColumn: {
    flexBasis: '15%',
  },
  grandTotalWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    // gap: '50px',
    fontSize: '18px',
    padding: '0 20px',
  },
  grandTotalText: {
    fontWeight: 'medium',
    flexBasis: '15%',
  },
  grandTotalValue: {
    fontWeight: 'bold',
    flexBasis: '15%',
  },
});

function InvoicePDF({
  submittedOn,
  date,
  customer,
  invoiceNo,
  productList,
  vendor,
  grandTotal = 0,
}: IInvoicePDF) {
  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        <View style={styles.headerWrapper}>
          <Image source={PrimaryLogo} />
          <Text style={styles.logoText}>Crafting Beautiful Beginnings</Text>
        </View>

        <View style={styles.flexColWrapper}>
          <Text style={styles.headerText}>INVOICE</Text>
          <Text style={styles.headerDate}>Submitted on {submittedOn}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItemWrapper}>
            <Text style={styles.detailHeader}>No Invoice</Text>
            <Text style={styles.detailBody}>#{invoiceNo}</Text>
          </View>
          <View style={styles.detailItemWrapper}>
            <Text style={styles.detailHeader}>Customer</Text>
            <Text style={styles.detailBody}>{customer}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItemWrapper}>
            <Text style={styles.detailHeader}>Date</Text>
            <Text style={styles.detailBody}>{date}</Text>
          </View>
          <View style={styles.detailItemWrapper}>
            <Text style={styles.detailHeader}>Vendor</Text>
            <Text style={styles.detailBody}>{vendor}</Text>
          </View>
        </View>

        <View style={styles.tableWrapper}>
          <View style={styles.tableHeadWrapper}>
            <View style={styles.tableFirstColumn}>
              <Text>Product</Text>
            </View>
            <View style={styles.tableSecondColumn}>
              <Text>Description</Text>
            </View>
            <View style={styles.tableThirdColumn}>
              <Text>Qty</Text>
            </View>
            <View style={styles.tableFourthColumn}>
              <Text>Price</Text>
            </View>
          </View>

          {productList.map((product) => (
            <View key={product.id} style={styles.tableRowWrapper}>
              <View style={styles.tableFirstColumn}>
                <Text>{product.name}</Text>
              </View>
              <View style={styles.tableSecondColumn}>
                <Text>{product.description}</Text>
              </View>
              <View style={styles.tableThirdColumn}>
                <Text>{product.qty} day</Text>
              </View>
              <View style={styles.tableFourthColumn}>
                <Text>{formatToIDR(product.price)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.grandTotalWrapper}>
          <Text style={styles.grandTotalText}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>{formatToIDR(grandTotal)}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;
