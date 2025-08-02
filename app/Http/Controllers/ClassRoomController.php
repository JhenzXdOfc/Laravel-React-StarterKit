<?php

namespace App\Http\Controllers;

use App\Models\ClassRoom;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = ClassRoom::with(['teacher', 'students'])
            ->orderBy('grade_level')
            ->orderBy('name')
            ->get();

        return Inertia::render('Classes/Index', [
            'classes' => $classes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = Teacher::with('subject')->orderBy('name')->get();

        return Inertia::render('Classes/Create', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'grade_level' => 'required|string|max:10',
            'teacher_id' => 'required|exists:teachers,id',
            'capacity' => 'required|integer|min:1|max:50',
        ]);

        ClassRoom::create($request->all());

        return redirect()->route('classes.index')
            ->with('success', 'Class created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ClassRoom $class)
    {
        $class->load(['teacher.subject', 'students']);

        return Inertia::render('Classes/Show', [
            'class' => $class
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ClassRoom $class)
    {
        $teachers = Teacher::with('subject')->orderBy('name')->get();

        return Inertia::render('Classes/Edit', [
            'class' => $class,
            'teachers' => $teachers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ClassRoom $class)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'grade_level' => 'required|string|max:10',
            'teacher_id' => 'required|exists:teachers,id',
            'capacity' => 'required|integer|min:1|max:50',
        ]);

        $class->update($request->all());

        return redirect()->route('classes.index')
            ->with('success', 'Class updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassRoom $class)
    {
        $class->delete();

        return redirect()->route('classes.index')
            ->with('success', 'Class deleted successfully.');
    }
}
