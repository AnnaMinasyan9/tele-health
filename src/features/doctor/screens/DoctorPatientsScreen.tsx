import type { Patient } from "@shared/models";
import { logout, selectCurrentUser } from "@shared/store/auth";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import { selectDoctorPatients } from "@shared/store/patients/patients.selectors";
import { getPatientsByDoctorId } from "@shared/store/patients/patients.thunk";
import { colors, spacing } from "@shared/theme";
import { EmptyState } from "@shared/ui";
import { DoctorPatientsHeader, PatientRow } from "@widgets";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export function DoctorPatientsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  const doctorId = currentUser?.id;

  const patients = useAppSelector((state) => selectDoctorPatients(state, doctorId));

  useEffect(() => {
    if (!doctorId) return;
    dispatch(getPatientsByDoctorId(doctorId));
  }, [dispatch, doctorId]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const openPatient = useCallback(
    (id: string) => {
      router.push(`/doctor/patient/${id}`);
    },
    [router]
  );
  const renderItem = useCallback(
    ({ item }: { item: Patient }) => (
      <PatientRow patient={item} onPress={() => openPatient(item.id)} />
    ),
    [openPatient]
  );

  const keyExtractor = useCallback((item: Patient) => item.id ?? "", []);

  const empty = useMemo(
    () => (
      <EmptyState
        icon="👥"
        title="No patients yet"
        subtitle="Patients assigned to you will appear here"
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <DoctorPatientsHeader
        name={currentUser?.fullName ?? ""}
        patientCount={patients.length}
        onLogout={handleLogout}
      />

      <FlatList
        data={patients}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10}
        contentContainerStyle={styles.list}
        ListEmptyComponent={empty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.xxl },
});
