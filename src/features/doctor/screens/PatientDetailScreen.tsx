import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { EmptyState, MainButton, NavHeader, SectionHeader } from "@/shared/ui";
import { PatientProfileCard, SessionRow } from "@/widgets";
import type { CreateSessionPayload, Session } from "@shared/models";
import { spacing, useStyles, type AppTheme } from "@shared/theme";

import { selectCurrentUser } from "@shared/store/auth";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import { selectDoctorPatientById } from "@shared/store/patients/patients.selectors";
import { createSession, getSessionsByDoctorId } from "@shared/store/session";
import {
  selectIsSessionCreating,
  selectSessionsByDoctorAndPatientId,
} from "@shared/store/session/session.selector";

export function PatientDetailScreen() {
  const styles = useStyles(createStyles);

  const { id: patientId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  const doctorId = currentUser?.id;

  const patient = useAppSelector((state) =>
    selectDoctorPatientById(state, doctorId, patientId),
  );

  const sessions = useAppSelector((state) =>
    selectSessionsByDoctorAndPatientId(state, doctorId, patientId),
  );

  const isSessionCreating = useAppSelector(selectIsSessionCreating);

  useEffect(() => {
    if (!doctorId) return;
    dispatch(getSessionsByDoctorId(doctorId));
  }, [dispatch, doctorId]);

  const handleBack = useCallback(() => router.back(), [router]);

  const handleScheduleSession = useCallback(() => {
    if (!doctorId || !patientId || !patient) return;

    const payload: CreateSessionPayload = {
      doctorId,
      patientId,
      location: "online",
      durationMinutes: 60,
    };

    dispatch(createSession(payload));
  }, [dispatch, doctorId, patientId, patient]);

  const renderItem = useCallback(({ item }: { item: Session }) => {
    return (
      <View style={styles.rowWrapper}>
        <SessionRow session={item} />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: Session) => item.id ?? "", []);

  const sessionLabel = useMemo(() => {
    const count = sessions.length;
    return count > 0 ? `Upcoming Sessions (${count})` : "Upcoming Sessions";
  }, [sessions.length]);

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyState
        icon="📅"
        title="No upcoming sessions"
        subtitle="Tap the button above to schedule one"
      />
    ),
    [],
  );

  const ListHeaderComponent = useMemo(() => {
    if (!patient) return null;

    return (
      <>
        <PatientProfileCard
          name={patient.fullName}
          email={patient.email}
          phone={patient.phone}
          doctorName={currentUser?.fullName}
        />

        <MainButton
          title="Add Schedule Session"
          onPress={handleScheduleSession}
          loading={isSessionCreating}
          style={styles.scheduleButton}
        />

        <SectionHeader title={sessionLabel} />
      </>
    );
  }, [
    patient,
    currentUser?.fullName,
    handleScheduleSession,
    isSessionCreating,
    sessionLabel,
  ]);

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
    <View style={styles.container}>
      <NavHeader title={patient.fullName} onBack={handleBack} />

      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: t.colors.background,
    },
    listContent: { paddingBottom: spacing.jumboLg },
    rowWrapper: { paddingHorizontal: spacing.xxl },
    scheduleButton: {
      marginHorizontal: spacing.xxl,
      marginTop: spacing.xxl,
    },
  });
}
