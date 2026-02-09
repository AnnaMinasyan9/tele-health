import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import type { ListRenderItem } from "react-native";
import { FlatList, StyleSheet, View } from "react-native";

import type { Patient, Session } from "@shared/models";
import { logout, selectCurrentUser } from "@shared/store/auth";
import { getDoctorById, selectDoctor } from "@shared/store/doctor";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import { getSessionsByPatientId, selectSessionsByPatientId } from "@shared/store/session";
import { spacing, useStyles, type AppTheme } from "@shared/theme";
import { EmptyState, SectionHeader } from "@shared/ui";
import { DoctorCard, PatientHomeHeader, SessionRow } from "@widgets";

export function PatientHomeScreen() {
  const styles = useStyles(createStyles);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  const patientId = currentUser?.id;
  const doctorId = (currentUser as Patient).doctorId;

  const doctor = useAppSelector(selectDoctor);
  const sessions = useAppSelector((state) =>
    selectSessionsByPatientId(state, patientId)
  );
  
  useEffect(() => {
    if (patientId) dispatch(getSessionsByPatientId(patientId));
    if (doctorId) dispatch(getDoctorById(doctorId));
  }, [dispatch, patientId, doctorId]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const keyExtractor = useCallback((item: Session) => item.id, []);

  const sessionLabel = useMemo(() => {
    const count = sessions.length;
    return count > 0 ? `Upcoming Sessions (${count})` : "Upcoming Sessions";
  }, [sessions.length]);

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyState
        title="No upcoming sessions"
        subtitle="Your doctor will schedule sessions for you"
      />
    ),
    []
  );

  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        <PatientHomeHeader
          name={currentUser?.fullName ?? ""}
          onDevTools={() => router.push("/(home)/dev-tools")}
          onLogout={handleLogout}
        />

        {doctor ? (
          <View style={styles.doctorCardWrapper}>
            <DoctorCard doctor={doctor} label="YOUR DOCTOR" />
          </View>
        ) : null}

        <SectionHeader title={sessionLabel} />
      </>
    );
  }, [currentUser, doctor, handleLogout, router, sessionLabel]);

  const renderItem = useCallback<ListRenderItem<Session>>(({ item }) => {
    return (
      <View style={styles.rowWrapper}>
        <SessionRow session={item} />
      </View>
    );
  }, []);

  return (
    <FlatList
      data={sessions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      style={styles.container}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      keyboardShouldPersistTaps="handled"
    />
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    listContent: {
      paddingBottom: spacing.jumboLg,
      backgroundColor: t.colors.background,
      flexGrow: 1,
    },
    rowWrapper: { paddingHorizontal: spacing.xxl },
    doctorCardWrapper: {
      marginHorizontal: spacing.xxl,
      marginTop: spacing.xxl,
    },
  });
}