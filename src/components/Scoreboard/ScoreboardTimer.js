import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, StatusBar, Platform } from "react-native";

import { material, systemWeights } from "react-native-typography";
import { useTranslation } from "react-i18next";
import DropDownPicker from "react-native-dropdown-picker";

import CustomPressable from "../common/CustomPressable";
import colors from "../../assets/themes/colors";

const formatNumber = (number) => `0${number}`.slice(-2);

const createArray = (length) => {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push({ label: formatNumber(i), value: formatNumber(i) });
	}
	return arr;
};

const AVAILABLE_MINUTES = createArray(59);
const AVAILABLE_SECONDS = createArray(60);

const ScoreboardTimer = ({
	isRunning,
	selectedMinutes,
	selectedSeconds,
	setSelectedMinutes,
	setSelectedSeconds,
	start,
	stop,
}) => {
	const { t } = useTranslation();

	const [isSecondsSelectorOpen, setIsSecondsSelectorOpen] = useState(false);
	const [isMinutesSelectorOpen, setIsMinutesSelectorOpen] = useState(false);

	const formattedSelectedMinutes = useMemo(() => formatNumber(selectedMinutes), [selectedMinutes]);
	const formattedSelectedSeconds = useMemo(() => formatNumber(selectedSeconds), [selectedSeconds]);

	const renderPickers = () => (
		<View style={styles.pickerContainer}>
			{isRunning ? (
				<View
					style={[
						styles.timerTextContainer,
						{
							marginRight: 5,
						},
					]}
				>
					<Text>{formattedSelectedMinutes}</Text>
				</View>
			) : (
				<View
					style={{
						flex: 1,
					}}
				>
					<DropDownPicker
						items={AVAILABLE_MINUTES}
						open={isMinutesSelectorOpen}
						setOpen={setIsMinutesSelectorOpen}
						onSelectItem={(val) => {
							setSelectedMinutes(val.value);
						}}
						value={selectedMinutes}
						maxHeight={200}
						autoScroll
						placeholder={selectedMinutes}
						dropDownDirection="TOP"
						disabled={isRunning}
						// theme="DARK"
					/>
				</View>
			)}

			{isRunning ? (
				<View style={styles.timerTextContainer}>
					<Text>{formattedSelectedSeconds}</Text>
				</View>
			) : (
				<View
					style={{
						flex: 1,
					}}
				>
					<DropDownPicker
						items={AVAILABLE_SECONDS}
						open={isSecondsSelectorOpen}
						setOpen={setIsSecondsSelectorOpen}
						onSelectItem={(val) => {
							setSelectedSeconds(val.value);
						}}
						value={selectedSeconds}
						maxHeight={200}
						autoScroll
						placeholder={selectedSeconds}
						dropDownDirection="TOP"
						disabled={isRunning}
						// theme="DARK"
					/>
				</View>
			)}
		</View>
	);

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			{renderPickers()}

			{isRunning ? (
				<CustomPressable style={[styles.clockButton, styles.stop]} onPress={stop}>
					<Text style={styles.text}>{t("scoreboard.stop")}</Text>
				</CustomPressable>
			) : (
				<CustomPressable style={styles.clockButton} onPress={start}>
					<Text style={styles.text}>{t("scoreboard.start")}</Text>
				</CustomPressable>
			)}
		</View>
	);
};

export default ScoreboardTimer;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},

	timerTextContainer: {
		justifyContent: "center",
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		backgroundColor: colors.white,
		opacity: 0.8,
	},

	clockButton: {
		borderColor: colors.grey,
		borderWidth: 2,
		borderRadius: 20,
		justifyContent: "center",

		alignItems: "center",
		width: 100,
		marginHorizontal: 5,

		height: 40,
	},

	stop: {
		backgroundColor: colors.danger,
	},
	text: {
		...material.subheading,
		color: colors.white,
		...systemWeights.bold,
	},
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 15,
		// overflow: "hidden",
		height: 40,
		width: 210,
	},
	pickerItem: {
		color: colors.black,

		...Platform.select({
			android: {
				marginLeft: 10,
				marginRight: 10,
			},

			ios: {
				height: 40,
			},
		}),
	},

	picker: {
		flex: 1,
		maxWidth: 100,
		height: 40,

		...Platform.select({
			android: {
				color: colors.black,
				backgroundColor: colors.white,
				height: 40,
				maxHeight: 40,
			},
			ios: {
				color: colors.black,
				backgroundColor: colors.white,
				height: 40,
				maxHeight: 40,
			},
		}),
	},
});
