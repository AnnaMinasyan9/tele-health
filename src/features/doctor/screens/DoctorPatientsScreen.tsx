import type { Patient } from "@shared/models";
import { logout, selectCurrentUser } from "@shared/store/auth";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import {
  selectDoctorPatients,
  selectIsPatientsLoading,
} from "@shared/store/patients/patients.selectors";
import { getPatientsByDoctorId } from "@shared/store/patients/patients.thunk";
import { spacing, useStyles, type AppTheme } from "@shared/theme";
import { EmptyState, SearchField } from "@shared/ui";
import { DoctorPatientsHeader, PatientRow } from "@widgets";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const SEARCH_DEBOUNCE_MS = 400;

export function DoctorPatientsScreen() {
  const styles = useStyles(createStyles);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  const doctorId = currentUser?.id;

  const patients = useAppSelector((state) => selectDoctorPatients(state, doctorId));
  const isPatientsLoading = useAppSelector(selectIsPatientsLoading);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [hasSearchInteracted, setHasSearchInteracted] = useState(false);

  const trimmedQuery = debouncedSearch.trim();
  const showSearchLoading = hasSearchInteracted && isPatientsLoading;

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!doctorId) return;

    dispatch(
      getPatientsByDoctorId({
        doctorId,
        search: trimmedQuery.length ? trimmedQuery : undefined,
      })
    );
  }, [dispatch, doctorId, trimmedQuery]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleChangeSearch = useCallback((text: string) => {
    setHasSearchInteracted(true);
    setSearch(text);
  }, []);

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

  const keyExtractor = useCallback((item: Patient) => item.id, []);

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

  const listHeader = useMemo(
    () => (
      <SearchField
        value={search}
        onChangeText={handleChangeSearch}
        loading={showSearchLoading}
      />
    ),
    [handleChangeSearch, search, showSearchLoading]
  );

  return (
    <View style={styles.container}>
      <DoctorPatientsHeader
        name={currentUser?.fullName ?? ""}
        patientCount={patients.length}
        onDevTools={() => router.push("/(home)/dev-tools")}
        onLogout={handleLogout}
      />

      <FlatList
        data={patients}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10}
        contentContainerStyle={styles.list}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={empty}
      />
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    list: { padding: spacing.xxl },
  });
}
