import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { EmptyState, NavHeader } from "@/shared/ui";
import { PatientProfileCard } from "@/widgets";
import { colors, spacing } from "@shared/theme";

import { selectCurrentUser } from "@shared/store/auth";
import { useAppSelector } from "@shared/store/hooks";
import { selectDoctorPatientById } from "@shared/store/patients/patients.selectors";

export function PatientDetailScreen() {
  const { id: patientId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const currentUser = useAppSelector(selectCurrentUser);
  const doctorId = currentUser?.id;

  const patient = useAppSelector((state) =>
    selectDoctorPatientById(state, doctorId, patientId),
  );

  const handleBack = useCallback(() => router.back(), [router]);

  if (!patient) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <NavHeader title="Patient" onBack={handleBack} />
        <View style={styles.center}>
          <EmptyState icon="🔍" title="Patient not found" />
        </View>
      </>
    );
  }

  return (
    <>
      <NavHeader title={patient.fullName} onBack={handleBack} />
      <PatientProfileCard
          name={patient.fullName}
          email={patient.email}
          phone={patient.phone}
          doctorName={currentUser?.fullName}
        />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  listContent: { paddingBottom: spacing.jumboLg },
  rowWrapper: { paddingHorizontal: spacing.xxl },
  scheduleButton: {
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xxl,
  },
});
