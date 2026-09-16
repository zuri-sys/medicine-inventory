<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index(): JsonResponse { return response()->json(Medicine::query()->latest()->get()); }
    public function show(Medicine $medicine): JsonResponse { return response()->json($medicine); }
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(['brand_name' => ['required', 'string', 'max:255'], 'category' => ['required', 'string', 'max:255'], 'stock_quantity' => ['required', 'integer', 'min:0']]);
        return response()->json(Medicine::create($data), 201);
    }
}
