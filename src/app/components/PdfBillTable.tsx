'use client';
import { Note, StyleSheet, Text, View } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
	table: {
		width: '100%',
		paddingTop: 40
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		borderTop: '1px solid #EEE',
		paddingTop: 8,
		paddingBottom: 8,
	},
	header: {
		borderTop: 'none',
	},
	bold: {
		fontWeight: 'bold',
	},
	// So Declarative and unDRY 👌
	row1Spl: {
		display: 'flex',	
		width: '40%',
		fontSize: 13
	},
	row1: {
		width: '40%',
		fontSize: 13
	},
	row2: {
		width: '20%',
		fontSize: 13
	},
	row3: {
		width: '20%',
		fontSize: 13
	},
	row4: {
		width: '20%',
		fontSize: 13
	}
})

const ReportTable = ({ data }: any) => {
	let finalTotalAmount = 0

	return (
		<View style={styles.table}>
			<View style={[styles.row, styles.bold, styles.header]}>
				<Text style={styles.row1}>Item Description</Text>
				<Text style={styles.row2}>Price</Text>
				<Text style={styles.row3}>Quantity</Text>
				<Text style={styles.row4}>Total</Text>
			</View>
			{data.map((row: any, i: any) => {

				const itemDescription = row['Item Description'];
				const itemDescriptionArr = itemDescription.match(/.{1,9}/g)
				finalTotalAmount = finalTotalAmount + row.Total;

				return (
					<View key={i} style={styles.row} wrap={false}>

						<View style={styles.row1Spl} >
							<View style={{}} >
								<div style={{ display: 'block', wordBreak: 'break-all' }}>

									{
										itemDescriptionArr.map((itemdesc: any) => {
											return (
												<Text  >
													{itemdesc}
												</Text>
											)
										})
									}
								</div>
							</View>
						</View>

						<Text style={styles.row2}>{row.Price}</Text>
						<Text style={styles.row3}>{row.Quantity}</Text>
						<Text style={styles.row4}>{row.Total}</Text>
					</View>
				)

			})}

		<View>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
				<Text style={{fontSize: 20, fontWeight: 600}}>Total: {finalTotalAmount}/-</Text>
			</div>
		</View>
		</View>
	)
}

export default ReportTable