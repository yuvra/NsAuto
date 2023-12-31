'use client';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import ReportTable from './PdfBillTable';
import moment from 'moment';

const MyDocument = ({ data }: any) => {
	console.log("data", data);

	return (
		<Document>
			<Page style={styles.page} >
				<View style={styles.section}>
					<View fixed style={styles.header}>
						<View style={{ display: 'flex', width: '38%' }}>
							<Text style={{ color: '#fff' }}>NS Automobile</Text>
							<Text style={{ color: '#fff', fontSize: 11 }}>Dudhane estate, opposite Dudhane lawns, Karve Nagar Pune - 411052,</Text>
							<Text style={{ color: '#fff', fontSize: 11 }}>Contact: +91-9890111425</Text>
						</View>
						<View>
							<Image src={"/NsLogo.jpeg"} style={{ width: 80, height: 60 }} />
						</View>
					</View>
					<View style={styles.body}>
						<View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
							<View style={{ width: '50%' }}>
								<div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: 10 }}>
									<Text style={{ fontSize: 13, color: 'black' }}>Name:  </Text>
									<Text style={{ color: 'black', fontSize: 13 }}>{data?.name}</Text>
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: 10 }}>
									<Text style={{ color: 'black', fontSize: 13 }}>Mobile Number:  </Text>
									<Text style={{ color: 'black', fontSize: 13 }}>{data?.mobileNumber}</Text>
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: 10 }}>
									<Text style={{ color: 'black', fontSize: 13 }}>Vehicle Number:  </Text>
									<Text style={{ color: 'black', fontSize: 13 }}>{data?.vehicleNumber}</Text>
								</div>
							</View>
							<View style={{ width: '50%' }}>
								<div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: 10 }}>
									<Text style={{ color: 'black', fontSize: 13 }}>Kilometer Reading:  </Text>
									<Text style={{ color: 'black', fontSize: 13 }}>{data?.kilometerReading}</Text>
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: 10 }}>
									<Text style={{ color: 'black', fontSize: 13 }}>Billing Date:  </Text>
									<Text style={{ color: 'black', fontSize: 13 }}>{moment(data?.date).format('DD-MM-YYYY')}</Text>
								</div>
								<div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: 10 }}>
									<Text style={{ color: 'black', fontSize: 13 }}>Service Note:  </Text>
									<Text style={{ color: 'black', fontSize: 13 }}>{data?.note}</Text>
								</div>
							</View>
						</View>

						<View>
							<ReportTable data={data.billingData} />
						</View>
					</View>
					{/* <View fixed style={styles.footer}>
						<View>
							<Text style={{ color: '#fff' }}>NS Automobile</Text>
							<Text style={{ color: '#fff', paddingTop: 5 }}>Contact: +91-9890111425</Text>
						</View>
						<View>
							<Image src={"/NsLogo.jpeg"} style={{ width: 80, height: 60 }} />
						</View>
					</View> */}
				</View>
			</Page>
		</Document>
	)
};

// Define your styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#FFF',
		height: '100vh'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	header: {
		paddingLeft: 10,
		paddingRight: 10,
		height: '10%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#1c2739'
	},
	body: {
		paddingLeft: 13,
		paddingRight: 10,
		height: '80%',
		paddingTop: 20
	},
	footer: {
		paddingLeft: 10,
		paddingRight: 10,
		height: '10%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#1c2739'
	},
	infobody: {
		display: 'flex',

		backgroundColor: 'red'
	}
});

// Render the PDF component
const MyPdf = ({ data }: any) => {
	return (
		<MyDocument data={data} />
	)
};

export default MyPdf;